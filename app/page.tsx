import Image from 'next/image'
import Header from './components/Header'
import DashboardPage from './dashboard/page'

export default function Home() {
  return (
    <div className=' h-screen'>
      <Header />
      <DashboardPage />
    </div>  )
}
