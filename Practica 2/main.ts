
const productos = [

  { id: 1, nombre: 'Producto A', precio: 30 },
  
  { id: 2, nombre: 'Producto B', precio: 20 },
  
   { id: 3, nombre: 'Producto C', precio: 50 },
  
   { id: 4, nombre: 'Producto D', precio: 10 }
  
  ];

  const handler = (req:Request):Response =>{

    const url= new URL(req.url);
    const path = url.pathname;
    const searchParams = url.searchParams;
  
    if(path === "/productos"){

      if(searchParams.get("minPrecio") && searchParams.get("maxPrecio")){
        const minP = searchParams.get("minPrecio");
        const maxP = searchParams.get("maxPrecio");
        const maxMin = productos.filter((elem)=> (elem.precio >= Number(minP)) && (elem.precio <= Number(maxP)));
        return new Response(JSON.stringify(maxMin));
      }
      if(searchParams.get("minPrecio")){
        const minPrecio = searchParams.get("minPrecio");
        const minP = productos.filter((elem)=>elem.precio >= Number(minPrecio));
        return new Response(JSON.stringify(minP));
      }
      else if(searchParams.get("maxPrecio")){
        const maxPrecio = searchParams.get("maxPrecio");
        const maxp = productos.filter((elem)=>elem.precio <= Number(maxPrecio));
        return new Response(JSON.stringify(maxp));
      }
      
      return new Response(JSON.stringify(productos));
    }
    else if (path.startsWith("/producto/")) {
      const id = path.split("/").pop(); 
      const mismoID = productos.find((elem)=> elem.id === Number(id));
    
      if (!mismoID) {
        return new Response("Producto no encontrado", { status: 404 });
      }
      
      return new Response(JSON.stringify(mismoID));
    }
    else if(path === "/calcular-promedio"){

      const promedio = productos.reduce((acc,elem)=>{
          return acc+elem.precio;
      },0) / productos.length

      if(searchParams.get("minPrecio") && searchParams.get("maxPrecio")){
        const minP = searchParams.get("minPrecio");
        const maxP = searchParams.get("maxPrecio");
        const filtro = productos.filter((elem)=> elem.precio >= Number(minP) && elem.precio <= Number(maxP));

        const promedio = filtro.reduce((acc,elem)=>{
          return acc+elem.precio;
      },0) / filtro.length

        return new Response(JSON.stringify(promedio));
      }

      if(searchParams.get("minPrecio")){
        const minPrecio = searchParams.get("minPrecio");
        const filtro = productos.filter((elem)=>elem.precio >= Number(minPrecio));

        const promedio = filtro.reduce((acc,elem)=>{
          return acc+elem.precio;
      },0) / filtro.length

        return new Response(JSON.stringify(promedio));
      }
      else if(searchParams.get("maxPrecio")){
        const maxPrecio = searchParams.get("maxPrecio");
        const filtro = productos.filter((elem)=>elem.precio <= Number(maxPrecio));

        const promedio = filtro.reduce((acc,elem)=>{
          return acc+elem.precio;
      },0) / filtro.length

        return new Response(JSON.stringify(promedio));
      }
      
      return new Response(JSON.stringify(promedio));
    }
    
    return new Response(`La ruta ${path} no existe`, {status:404});
  
  }
  
  Deno.serve({port:3000}, handler);
  
