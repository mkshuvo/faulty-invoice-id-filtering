import Delim from "@/components/Delim";
import InvoiceExtractor from "@/components/InvoiceExtractor";
import InvoiceQueryGenerator from "@/components/InvoiceQueryGenerator";
import ListComparator from "@/components/ListComparator";
import NumberStatistics from "@/components/NumberStatistics";

interface Props { }

export const App: React.FC<Props> = () => {
    return (
        <div>
            <br />
            <h1 className='text-center'><span>🟦 </span>Invoice ID Troubleshooting tools.<span>🟦</span></h1>
            <br />
            <br />
            <InvoiceQueryGenerator />
            <br />
            <hr />
            <br />
            <InvoiceExtractor />
            <br />
            <hr />
            <br />
            <NumberStatistics />
            <br />
            <hr />
            <br />
            <ListComparator />
            <br />
            <hr />
            <br />
            <Delim />
        </div>
    );
}