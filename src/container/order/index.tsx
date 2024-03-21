import { useEffect, useState } from "react";
import ListOrder from "../../component/listOrder";
import { firestore } from "../../firebase";

interface Table {
    id: string;
    enable: boolean;
}

export default function Order() {
    const [tables, setTables] = useState<Table[]>([]);
    const [tableChoosed, setTableChoosed] = useState<string | undefined>();
    const [tableInprocess, setTableInprocess] = useState<string>('');

    useEffect(() => {
        firestore.get('table')
            .then((data: Table[]) => {
                if (data) {
                    setTables(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching table data:', error);
            });
    }, []);

    const handleTableClick = (table: { enable: boolean, id: string }) => {
        table.enable && setTableChoosed(table.id)
    };

    return (
        <div className='flex flex-col items-center w-full bg-[#F5F5F5]'>
            <div className="font-Fredoka font-semibold text-[30px] text-center my-2">
                Chuc <span className="text-[#E44F4F]">quy khach</span> ngon mieng
            </div>
            <div className="flex flex-wrap gap-2 items-center w-[100%] md:w-[95%] lg:w-[60rem] mb-3 mt-1 justify-center">
                {tableInprocess === '' ? (
                    tables.map((table: Table) => (
                        <div className={`relative ${table.enable ? '' : 'opacity-50'}`} key={table.id} onClick={() => handleTableClick(table)}>
                            <svg width="60px" height="60px" viewBox="0 0 24 24" fill={table.enable ? (table.id === tableChoosed ? "#07da63" : "none") : "orange"} xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 9H2M2 7.8L2 16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27977 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3L6.8 3C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="absolute bottom-[0.6rem] font-Fredoka text-lg font-bold left-6">{table.id}</div>
                        </div>
                    ))
                ) : (
                    <div className="relative">
                        <svg width="60px" height="60px" viewBox="0 0 24 24" fill="#07da63" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 9H2M2 7.8L2 16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27977 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3L6.8 3C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="absolute bottom-[0.6rem] font-Fredoka text-lg font-bold left-6">{tableInprocess}</div>
                    </div>
                )}
            </div>
            <ListOrder table={tableChoosed ? tableChoosed : ''} onCreateOrUpdateBill={(dataTableInProcess) => setTableInprocess(dataTableInProcess)} />
        </div>
    );
}
