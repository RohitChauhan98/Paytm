import Qr from './assets/qr.svg'
import Bank from './assets/bank.svg'
import History from './assets/history.svg'
import Rupee from './assets/rupee.svg'

export const Features = () => {
    return <div className="flex justify-around mt-10">
        <div>
            <button className="p-5 rounded-3xl bg-slate-900">
                <img src={Qr} alt="" />
            </button>
            <div className="text-center pt-2">
                <p>Scan & Pay</p>
            </div>
        </div>
        <div>
            <button className="p-5 rounded-3xl bg-slate-900">
                <img src={Bank} alt="" />
            </button>
            <div className="text-center pt-2">
                <p>To Bank</p>
            </div>
        </div>
        <div>
            <button className=" p-5 rounded-3xl bg-slate-900">
            <img src={History} alt="" />
            </button>
            <div className="text-center text-pretty pt-2">
                <p className="max-w-[75px]">Balance & History</p>
            </div>
        </div>
        <div>
            <button className="p-5 rounded-3xl bg-slate-900">
            <img src={Rupee} alt="" />
            </button>
            <div className="text-center break- pt-2">
                <p>Add Money</p>
            </div>
        </div>
    </div>
}