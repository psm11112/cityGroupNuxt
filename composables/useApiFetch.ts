import type {UseFetchOptions} from "nuxt/app";


export function useApiFetch<T>(path:string,options:UseFetchOptions<T>){

  const token=useCookie('XSRF-TOKEN');
  let headers:any={}
  if(token.value){
    headers['X-XSRF-TOKEN']=token.value as string
  }

  console.log(process.server)

  if(process.server){
      headers={
          ...headers,
          ...useRequestHeaders(["referer","cookie"])
      }
  }
  return useFetch("https://admin.nearmeglocal.com"+path,{
    credentials:'include',
   ...options,
    watch:false,
    headers:{
     ...headers,
        ...options?.headers
    }


  })

}

// export function useApiFetch<T>(path:string,option:UseFetchOptions<T> = {}) => {
//
//   const token=useCookie('XSRF-TOKEN');
//
//
//   return useFetch("http://localhost:8000/"+path,{
//     credentials:'include',
//     method:'POST',
//    ...option,
//     watch:false,
//     headers:{
//       'X-XSRF-TOKEN':token.value as string
//     }
//
//
//   })
//
// }
