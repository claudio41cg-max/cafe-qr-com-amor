import { useEffect, useState } from 'react'
import { Building2, LockKeyhole, RefreshCcw } from 'lucide-react'
import api from '../../lib/api'

export default function ClientCentral() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  async function load() {
    setStatus('loading')
    setError('')
    try {
      const response = await api.platformBusinesses()
      setData(response)
      setStatus('ready')
    } catch (err) {
      setStatus(err.status === 403 ? 'forbidden' : 'error')
      setError(err.message || 'Não foi possível carregar os clientes.')
    }
  }
  useEffect(() => { load() }, [])
  return (
    <main className="mx-auto w-full max-w-5xl p-4 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Central de Clientes</h2>
          <p className="mt-1 text-sm text-gray-500">Visualização inicial das cafeterias autorizadas. Cadastro e edição serão liberados após os testes de segurança.</p>
        </div>
        <button onClick={load} type="button" aria-label="Atualizar cafeterias" className="rounded-lg border bg-white p-2"><RefreshCcw className="h-5 w-5" /></button>
      </div>
      {status === 'loading' && <p>Carregando cafeterias...</p>}
      {status === 'forbidden' && <div className="rounded-xl border bg-white p-6 text-gray-700"><LockKeyhole className="mb-3 h-6 w-6" /><strong>Acesso restrito</strong><p className="mt-2">Esta conta ainda não foi habilitada como operadora da plataforma.</p></div>}
      {status === 'error' && <div role="alert" className="rounded-xl border bg-white p-6 text-red-700">{error}</div>}
      {status === 'ready' && (
        <>
          <p className="mb-4 text-sm text-gray-500">{data.businesses.length} cafeteria(s) disponível(is)</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.businesses.map((business) => (
              <article key={business.id} className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3"><Building2 className="h-6 w-6 text-amber-700" /><h3 className="font-semibold text-gray-900">{business.name}</h3></div>
                <p className="mt-3 break-words text-sm text-gray-500">{business.slug}</p>
                <a className="mt-3 inline-block text-sm text-amber-700 underline" target="_blank" rel="noopener noreferrer" href={`/m/${encodeURIComponent(business.slug)}`}>Abrir cardápio público</a>
              </article>
            ))}
            {!data.businesses.length && <p className="text-gray-500">Nenhuma cafeteria autorizada para sua conta.</p>}
          </div>
        </>
      )}
    </main>
  )
}
