import InvoiceQueryGenerator from '@/components/InvoiceQueryGenerator'
import InvoiceExtractor from '@/components/InvoiceExtractor'
import NumberStatistics from '@/components/NumberStatistics'
import ListComparator from '@/components/ListComparator'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home() {
  return (
    <main>
      <InvoiceQueryGenerator />
      <InvoiceExtractor />
      <NumberStatistics />
      <ListComparator />
    </main>
  )
}
