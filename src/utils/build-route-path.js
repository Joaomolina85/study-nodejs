export function buildRoutePath(path) {
    const routerParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParameters = path.replaceAll(routerParametersRegex, '(?<$1>[a-z0-9\-_]+)')

   const pathRegex = new RegExp(`^${pathWithParameters}(?<query>\\?(.*))?$`);
   
   return  pathRegex;

   

}