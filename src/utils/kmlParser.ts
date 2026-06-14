/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KmlPlacemark {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
  category: 'hospital' | 'school' | 'residential' | 'general';
  description?: string;
}

/**
 * Parses raw KML text into structured Placemark objects.
 */
export function parseKml(kmlText: string): KmlPlacemark[] {
  const placemarks: KmlPlacemark[] = [];
  
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(kmlText, 'text/xml');
    
    // Check for parsing errors
    const parserError = xmlDoc.getElementsByTagName('parsererror');
    if (parserError.length > 0) {
      console.error('KML Parsing Error:', parserError[0].textContent);
      return getDefaultPlacemarks();
    }
    
    const placemarkNodes = xmlDoc.getElementsByTagName('Placemark');
    
    for (let i = 0; i < placemarkNodes.length; i++) {
      const node = placemarkNodes[i];
      const id = node.getAttribute('id') || `kml-pm-${i}`;
      const name = node.getElementsByTagName('name')[0]?.textContent?.trim() || 'Unnamed Location';
      
      // Look up style URL to determine category
      const styleUrl = node.getElementsByTagName('styleUrl')[0]?.textContent?.trim() || '';
      let category: 'hospital' | 'school' | 'residential' | 'general' = 'general';
      
      if (name.toLowerCase().includes('hospital') || styleUrl.includes('09C74849033FF6D526D3')) {
        category = 'hospital';
      } else if (name.toLowerCase().includes('school') || styleUrl.includes('03AB01CC9E3FF6D65FE9')) {
        category = 'school';
      } else if (name.toLowerCase().includes('ecoville') || styleUrl.includes('0D8138A6883FF6D44A79')) {
        category = 'residential';
      }
      
      // Extract coordinates
      const coordinatesNode = node.getElementsByTagName('coordinates')[0];
      if (coordinatesNode && coordinatesNode.textContent) {
        const coordText = coordinatesNode.textContent.trim();
        // KML coordinates are: longitude,latitude,altitude (often space-separated inside)
        const parts = coordText.split(',');
        if (parts.length >= 2) {
          const lng = parseFloat(parts[0].trim());
          const lat = parseFloat(parts[1].trim());
          
          if (!isNaN(lat) && !isNaN(lng)) {
            placemarks.push({
              id,
              name,
              coordinates: [lat, lng],
              category,
              description: getCategoryDescription(category, name)
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error parsing KML file:', error);
    return getDefaultPlacemarks();
  }
  
  return placemarks.length > 0 ? placemarks : getDefaultPlacemarks();
}

function getCategoryDescription(category: string, name: string): string {
  switch (category) {
    case 'hospital':
      return 'Nearby Medical & Healthcare Facility';
    case 'school':
      return 'Reputed Educational Institution';
    case 'residential':
      return 'Premium Residential Community Project';
    default:
      return 'Local Landmark';
  }
}

/**
 * Fallback static placemarks in case parsing fails in some browser environments
 */
function getDefaultPlacemarks(): KmlPlacemark[] {
  return [
    {
      id: '0292507E463FF6D34C6E',
      name: 'Prarthana Ecoville',
      coordinates: [23.3901082, 85.3583991],
      category: 'residential',
      description: 'Premium Residential Community Project'
    },
    {
      id: '00B069B9413FF6D4E197',
      name: 'Bhagwan Mahavir Manipal Hospital',
      coordinates: [23.3959833, 85.3779205],
      category: 'hospital',
      description: 'Nearby Medical & Healthcare Facility'
    },
    {
      id: '0B266D28553FF6D58A38',
      name: 'Surendranath Centenary School',
      coordinates: [23.3843273, 85.3686638],
      category: 'school',
      description: 'Reputed Educational Institution'
    }
  ];
}
