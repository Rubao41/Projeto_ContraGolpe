import React, { useEffect, useState } from "react";

function Compaines() {
    return (
        <div>
            <h1 className="flex justify-center text-center text-[#2e2e2e]">Empresas mais Usadas</h1>
        </div>
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
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Ranking de Empresas</h2>
      <ul>
        {rankingArray.map((item, index) => (
          <li
            key={item.empresa}
            className="flex justify-between py-2 border-b last:border-none"
          >
            <span className="font-medium">
              {index + 1}. {item.empresa}
            </span>
            <span className="text-gray-600">{item.count} cadastros</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RankingEmpresas