import {FC, useEffect, useState } from "react"
import { UserDataType } from "../../consts/types"
import { getCookie } from "ui"

type Props = {
    userData: UserDataType | undefined
    setUserData: (value: UserDataType) => void
}

const Profile: FC<Props> = ({ userData, setUserData }) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [listOfCountries, setListOfCountries] = useState<any>([]);
    const [countryNumberCode, setCountryNumberCode] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userData) {
            return
        }
        setFirstName(userData.name ? userData.name : "")
        setLastName(userData.lastname ? userData.lastname : "")
        setAddress(userData.address ? userData.address : "")
        setCity(userData.city ? userData.city : "")
        setPhoneNumber(userData.phone ? userData.phone.toString() : "")

        if (!userData.country) {
            setCountry("")
        } else {
            setCountry(userData.country)
            if (listOfCountries.length != 0) {
                for (const country in listOfCountries) {
                    if (listOfCountries[country].name.common == userData.country) {
                        setCountryNumberCode(listOfCountries[country].idd.root + listOfCountries[country].idd.suffixes[0])
                        break;
                    }
                }
            }
        }

    }, [userData, listOfCountries])
    useEffect(() => {
        const fetchCountries = async () => {
            const countries = JSON.parse(sessionStorage.getItem("countries") as string)
            if (!countries) {
                const result = await fetch("https://restcountries.com/v3.1/all")
                const data = await result.json()
                data.sort(function(a:any, b:any) {
                    if (a.name.common < b.name.common) {
                        return -1;
                    }
                    if (a.name.common > b.name.common) {
                        return 1;
                    }
                    return 0;
                });
                setListOfCountries(data)
                sessionStorage.setItem("countries", JSON.stringify(data))
                return

            }
            setListOfCountries(countries)
        }
        fetchCountries().catch(console.error)
    }, [])
    const onClickSave = async () => {
        if(!userData){
            alert("Server error")
            return
        }
        setLoading(true)
        const data:UserDataType = {
            username: userData?.username,
            email: userData?.email,
            name: firstName == "" ? null : firstName,
            lastname: lastName == "" ? null : lastName,
            address: address == "" ? null : address,
            city: city == "" ? null : city,
            country: country == "" ? null : country,
            phone: phoneNumber == "" ? null : parseInt(phoneNumber),
            coins: userData?.coins
        }
        const token = getCookie("token")
        const result = await fetch(`/api/userdata/${token}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        const fetchData = await result.json();
        setLoading(false)
        if(fetchData.message =="error"){
            alert("Server error")
            return
        }
        setUserData(data);
        sessionStorage.setItem("userData",JSON.stringify(data));
        location.reload();
    }
    return (
        <div className="w-full h-full flex flex-col items-center text-3xl px-10 pt-6 gap-10 ">
            <h2 className=" w-full text-5xl font-bold border-b border-gray-400 pb-4">Profile</h2>
            <div className="flex flex-row w-full gap-10 ">
                <div className="flex flex-col w-1/2 gap-5">
                    <div id="username" className="flex flex-col gap-2">
                        <h3 className="font-bold pl-2">Username:</h3>
                        <input type="text" className="w-full px-6 py-8 text-gray-500 cursor-no-drop border border-gray-500 shadow-md shadow-gray-300 font-semibold bg-gray-200 rounded-xl" disabled value={userData?.username} />
                    </div>
                    <div id="email" className="flex flex-col gap-2">
                        <h3 className="font-bold pl-2">Email:</h3>
                        <input type="text" className="w-full px-6 py-8 text-gray-500 cursor-no-drop border border-gray-500 shadow-md shadow-gray-300 font-semibold bg-gray-200 rounded-xl" disabled value={userData?.email} />
                    </div>
                    <div id="firstlastname" className="flex flex-row gap-5">
                        <div id="firstname" className="flex flex-col gap-2 w-1/2">
                            <h3 className="font-bold pl-2">Firstname:</h3>
                            <input type="text" onChange={(e) => setFirstName(e.currentTarget.value)} value={firstName} className="w-full px-6 py-8 focus:outline-none border border-gray-500 shadow-md shadow-gray-300 bg-gray-200 rounded-xl" />
                        </div>
                        <div id="lastname" className="flex flex-col gap-2 w-1/2">
                            <h3 className="font-bold pl-2">Lastname:</h3>
                            <input type="text" onChange={(e) => setLastName(e.currentTarget.value)} value={lastName} className="w-full px-6 py-8 focus:outline-none border border-gray-500 shadow-md shadow-gray-300 bg-gray-200 rounded-xl" />
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-5 ">
                    <div id="address" className="flex flex-col gap-2">
                        <h3 className="font-bold pl-2">Address:</h3>
                        <input type="text" onChange={(e) => setAddress(e.currentTarget.value)} value={address} className="w-full px-6 py-8 focus:outline-none border border-gray-500 shadow-md shadow-gray-300 bg-gray-200 rounded-xl" />
                    </div>
                    <div id="citycountry" className="flex flex-row gap-5">
                        <div id="city" className="flex flex-col gap-2 w-1/3">
                            <h3 className="font-bold pl-2">City:</h3>
                            <input type="text" onChange={(e) => setCity(e.currentTarget.value)} value={city} className="w-full px-6 py-8 focus:outline-none border border-gray-500 shadow-md shadow-gray-300 bg-gray-200 rounded-xl" />
                        </div>
                        <div id="country" className="flex flex-col gap-2 w-2/3">
                            <h3 className="font-bold pl-2">Country:</h3>
                            <select onChange={(e) => { setCountry(e.currentTarget.value); e.currentTarget.size = 1; e.currentTarget.blur() }} onFocus={(e) => e.currentTarget.size = 4} onBlur={(e) => e.currentTarget.size = 1}
                                value={country} className="w-[24.6vw] px-6 py-7 absolute top-[213px]  noscrollbar border border-gray-500 shadow-md shadow-gray-300 bg-gray-200 rounded-xl">
                                {
                                    listOfCountries.map((country:any, index:number) => {
                                        return (
                                            <option key={`country-${index}`} value={country.name.common} className="px-4 py-3 border-t border-b border-gray-300 hover:bg-gray-500 rounded-xl " onClick={() => setCountryNumberCode(country.idd.root + country.idd.suffixes[0])}>
                                                {country.flag} {country.name.common}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div id="phone" className="flex flex-row gap-5">
                        <div id="code" className="flex flex-col gap-2 w-[13%]">
                            <h3 className="font-bold pl-2">&nbsp;</h3>
                            <input type="text" value={countryNumberCode ? countryNumberCode : ""} disabled className=" text-center w-full px-4 py-8 focus:outline-none border border-gray-500 shadow-md shadow-gray-300 bg-gray-200 rounded-xl" />
                        </div>
                        <div id="phone" className="flex flex-col gap-2 w-[87%]">
                            <h3 className="font-bold pl-2">Phone number:</h3>
                            <input type="number" disabled={country == "" ? true:false}   onChange={(e) => setPhoneNumber(e.currentTarget.value)} value={phoneNumber} className="w-full noarrows px-6 py-8 focus:outline-none border border-gray-500 shadow-md shadow-gray-300 bg-gray-200 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <button className="w-1/2 flex items-center justify-center text-white mt-10 bg-pink-900 text-4xl shadow-md shadow-gray-500 py-6 rounded-xl font-semibold hover:scale-105 transition" onClick={onClickSave}>
                {
                    loading ? (
                        <div className="w-10 h-10 border-4 rounded-[50%] border-b-transparent rotate" />
                    ) : (
                        <>
                            Save
                        </>
                    )
                }
            </button>
        </div>
    )
}
export default Profile; 
