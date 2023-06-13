/**
 * Extracts the strings between the : and / in the template
 * Could be one or multiple strings
 * Example: the given URI: /api/games/1 and the template: /api/games/:gameID 
 * will return the object {gameID: "1"}
 * 
 * @param uri The URI to extract the values from.
 * @param template The template to extract the values from.
 * @returns An object with the extracted values.
 */
export function extractFromUri(uri: string, template: string){
     const uriParts = uri.split('/');
     const templateParts = template.split('/');
     const extractedValues: any = {};
     for(let i = 0; i < uriParts.length; i++){
         if(templateParts[i].startsWith(':')){
             extractedValues[templateParts[i].substring(1)] = uriParts[i];
         }
     }
     return extractedValues;
 }

 /**
  * Expands the given URL with the given placeholders.
  * @param url The URL to expand.
  * @param placeholders  The placeholders to use.
  * @returns  The expanded URL.
  */
 function expandUrl(url: string, placeholders: Record<string, string>): string {
    let expandedUrl = url;
  
    // Replace each placeholder in the URL
    for (const placeholder in placeholders) {
      if (Object.prototype.hasOwnProperty.call(placeholders, placeholder)) {
        const value = placeholders[placeholder];
        const regex = new RegExp(`:${placeholder}`, 'g');
        expandedUrl = expandedUrl.replace(regex, value);
      }
    }
  
    return expandedUrl;
  }