import React, { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router'





// Inside the "pages/404.js" file
export default function Custom404() {
  const query = useRouter();
  useEffect(  () => {
    console.log('test');
  console.log(query.asPath);
  
  })
	return (
		<div>
        <iframe className=" w-[900px] " src="https://thrift-bharat.myshopify.com/59365785740/orders/4b620b263e589fab1fc4ec5f0d20504e">

        </iframe>
		</div>
	);
}
