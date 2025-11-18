import { useEffect, useState } from 'react'

function EmpresaDashboard() {
  const [denuncias, setDenuncias] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [total, setTotal] = useState(0)

  const loadData = (u, p = page, s = size) => {
    setLoading(true)
    fetch(`http://localhost:8080/usuarios/empresa/${encodeURIComponent(u)}/paged?page=${p}&size=${s}&sort=createdAt&dir=desc`)
      .then(async (res) => {
        if (!res.ok) {
          const t = await res.text()
          throw new Error(t || 'Falha ao carregar denúncias')
        }
        return res.json()
      })
      .then((data) => {
        if (data && Array.isArray(data.content)) {
          setDenuncias(data.content)
          setTotal(data.totalElements ?? data.content.length)
        } else {
          setDenuncias(Array.isArray(data) ? data : [])
          setTotal(Array.isArray(data) ? data.length : 0)
        }
      })
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const usuario = localStorage.getItem('empresaUsuario') || ''
    if (!usuario) {
      setErro('Usuário da empresa não encontrado. Faça login novamente.')
      setLoading(false)
      return
    }
    loadData(usuario, page, size)
  }, [page, size])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0b3d91] mb-4">Denúncias da sua empresa</h1>
      {loading && <p>Carregando...</p>}
      {erro && <p className="text-red-600">{erro}</p>}
      {!loading && !erro && (
        denuncias.length === 0 ? (
          <p>Nenhuma denúncia encontrada para sua empresa.</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm">Total: <span className="font-semibold">{total}</span></div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded bg-[#eaeaea] disabled:opacity-50" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>Anterior</button>
                <span className="text-sm">Página {page + 1}</span>
                <button className="px-2 py-1 rounded bg-[#eaeaea] disabled:opacity-50" disabled={(page + 1) * size >= total} onClick={() => setPage((p) => p + 1)}>Próxima</button>
                <select className="ml-2 border rounded px-2 py-1" value={size} onChange={(e) => { setPage(0); setSize(parseInt(e.target.value, 10)) }}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#eaeaea]">
                  <th className="p-2">Nome</th>
                  <th className="p-2">Cidade</th>
                  <th className="p-2">Data</th>
                  <th className="p-2">Meio de Contato</th>
                  <th className="p-2">Empresa</th>
                  <th className="p-2">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {denuncias.map((d) => (
                  <tr key={d.id} className="border-b">
                    <td className="p-2">{d.nome}</td>
                    <td className="p-2">{d.cidade}</td>
                    <td className="p-2">{d.createdAt ? new Date(d.createdAt).toLocaleString() : ''}</td>
                    <td className="p-2">{d.meioContato || d.meioDeContato || d.meio_contato || ''}</td>
                    <td className="p-2">{d.empresa}</td>
                    <td className="p-2 whitespace-pre-wrap">{d.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  )
}

export default EmpresaDashboard
