import InvoiceQueryGenerator from '@/components/InvoiceQueryGenerator'
import InvoiceExtractor from '@/components/InvoiceExtractor'
import NumberStatistics from '@/components/NumberStatistics'
import ListComparator from '@/components/ListComparator'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home() {
  return (
    <main>
      <br />
      <h1 className='text-center'><span>🟦 </span>Invoice ID Troubleshooting tools.<span>🟦</span></h1>
      <br />
      <br />
      <InvoiceQueryGenerator />
      <br />
      <InvoiceExtractor />
      <br />
      <NumberStatistics />
      <br />
      <ListComparator />
    </main>
  )
}
