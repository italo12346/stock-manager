
import { title } from 'process';
import React from 'react';
import Image from 'next/image';
interface layoutProps {
    title?:string, 
}

const Layout = (props:any) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-gray-800 text-white py-4">
        <div className="flex justify-center items-center container mx-auto px-4">
        <div className="logo pr-2">
            <Image className='rounded-full' src="/Logo.jpeg" alt="Logo" width={45} height={40} />
          </div>
          <h1 className="text-xl font-bold">{props.title ? props.title : "Gerente de Estoque"}</h1>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {props.children}
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          &copy; 2024 Gerente de Estoque. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

export default Layout;
