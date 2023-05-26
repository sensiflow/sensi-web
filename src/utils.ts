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