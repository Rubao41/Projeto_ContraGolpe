import React, { useEffect, useState } from "react";

function Compaines() {
  return (
    <header className="px-4 pt-6">
      <h1 className="text-center text-[#2e2e2e] text-2xl md:text-3xl font-bold">Empresas mais Usadas</h1>
    </header>
  )
}

function RankingEmpresas() {

  const [cadastros, setCadastros] = useState([]);
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {fetch("http://localhost:8080/usuarios")
     .then((res) => res.json())
     .then((data) => {
         setCadastros(data); 
         setLoading(false);
         }) 
         .catch((err) => {
           console.error("Erro ao buscar cadastros:", err);
           setLoading(false);
           });
           },
          []);
          

  

  const ranking = cadastros.reduce((acc, item) => {
    acc[item.empresa] = (acc[item.empresa] || 0) + 1;
    return acc;
  }, {});

  const rankingArray = Object.entries(ranking)
    .map(([empresa, count]) => ({ empresa, count }))
    .sort((a, b) => b.count - a.count);

    if (loading) {
      return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
    }

  return (
    <div className="px-4 pb-12">
      <div className="max-w-xl md:max-w-2xl mx-auto mt-8 bg-white shadow-md rounded-lg p-5 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">🏆 Ranking de Empresas</h2>
        <ul>
          {rankingArray.map((item, index) => (
            <li
              key={item.empresa}
              className="flex justify-between items-center py-2 border-b last:border-none text-sm md:text-base"
            >
              <span className="font-medium truncate max-w-[60%] md:max-w-none">
                {index + 1}. {item.empresa}
              </span>
              <span className="text-gray-600 whitespace-nowrap">{item.count} cadastros</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RankingEmpresas