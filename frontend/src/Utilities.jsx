import Mobile from "./assets/mobile.svg"
import Electricity from "./assets/electricity.svg"
import Gas from "./assets/gasBill.svg"
import Water from "./assets/waterBill.svg"
import Metro from "./assets/metro.svg"
import Tv from "./assets/tv.svg"
import Wifi from "./assets/wifi.svg"
import Credit from './assets/creditBill.svg'

export const Utilities = () => {
    return <div className="">
        <div>
            <p className="text-2xl font-semibold">
                Recharge and Utilities
            </p>
        </div>
        <div className="grid grid-cols-4  gap-4 mt-5 text-sm">
            <div>
                <div className="flex justify-center">
                    <button className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-5 rounded-3xl bg-gradient-to-r from-green-100 to-blue-100">
                        <img className="w-10 h-10" src={Mobile} alt="" />
                    </button>
                </div>
                <div className="text-center pt-2">
                    <p>Mobile Recharge</p>
                </div>
            </div>
            <div>
                <div className="flex justify-center">
                    <button className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-5 rounded-3xl bg-gradient-to-r from-green-100 to-blue-100">
                        <img className="w-10 h-10" src={Electricity} alt="" />
                    </button>
                </div>
                <div className="text-center pt-2">
                    <p>Electricity Bill</p>
                </div>
            </div>
            <div>
                <div className="flex justify-center">
                    <button className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-5 rounded-3xl bg-gradient-to-r from-green-100 to-blue-100">
                        <img className="w-10 h-10" src={Gas} alt="" />
                    </button>
                </div>
                <div className="text-center pt-2">
                    <p>Gas Bill</p>
                </div>
            </div>
            <div>
                <div className="flex justify-center">
                    <button className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-5 rounded-3xl bg-gradient-to-r from-green-100 to-blue-100">
                        <img className="w-10 h-10" src={Water} alt="" />
                    </button>
                </div>
                <div className="text-center pt-2">
                    <p>Water Bill</p>
                </div>
            </div>
            <div>
                <div className="flex justify-center">
                    <button className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-5 rounded-3xl bg-gradient-to-r from-green-100 to-blue-100">
                        <img className="w-10 h-10" src={Metro} alt="" />
                    </button>
                </div>
                <div className="text-center pt-2">
                    <p>Metro Recharge</p>
                </div>
            </div>
            <div>
                <div className="flex justify-center">
                    <button className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-5 rounded-3xl bg-gradient-to-r from-green-100 to-blue-100">
                        <img className="w-10 h-10" src={Tv} alt="" />
                    </button>
                </div>
                <div className="text-center pt-2">
                    <p>Cable Tv</p>
                </div>
            </div>
            <div>
                <div className="flex justify-center">
                    <button className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-5 rounded-3xl bg-gradient-to-r from-green-100 to-blue-100">
                        <img className="w-10 h-10" src={Credit} alt="" />
                    </button>
                </div>
                <div className="text-center pt-2">
                    <p>Credit Card payment</p>
                </div>
            </div>
            <div>
                <div className="flex justify-center">
                    <button className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-5 rounded-3xl bg-gradient-to-r from-green-100 to-blue-100">
                        <img className="w-10 h-10" src={Wifi} alt="" />
                    </button>
                </div>
                <div className="text-center pt-2">
                    <p>Broadband / Landline</p>
                </div>
            </div>
        </div>
    </div>
}