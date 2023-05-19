/**
 * Replaces the strings between the : and / in the template
 * Could be one or multiple strings
 * Example: the given URI: /api/games/:gameID and the params {gameID: "1"}
 * will return the URI: /api/games/1
 * 
 * @param uri The URI to extract the values from.
 * @param params The params to replace the values with.
 * @returns A string with the replaced values.
 */
export function replaceParamFromUri(uri: string, params: any){
    const uriParts = uri.split('/');
    const newUriParts = [];

    for(let i = 0; i < uriParts.length; i++){
       if(uriParts[i].startsWith(':')){
            const paramName = uriParts[i].substring(1);
            const paramValue = params[paramName];
            if(!paramValue) throw new Error(`Can not match ${paramName} with the given params to replace.`)
            newUriParts.push(paramValue);
            continue;
       }

         newUriParts.push(uriParts[i]);
    }
    return newUriParts.join('/');
}