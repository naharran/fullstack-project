'use client'
import axios from "axios"
import { useEffect,useState } from "react";
import { Artwork } from "../../../../shared/types";
import useDebounce from "../hooks/useDebounce";


export default function Catalog() {
    const [artworks, setArtwork] = useState<Artwork[]>();
    const [nameSearch, setNameSearch] = useState('');
    const debouncedNameSearch = useDebounce(nameSearch, 500); // Debounce with 500ms delay
    useEffect( ()=>{
        const pullData = async() =>{
            try{
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks?name=${debouncedNameSearch}`,{
                  withCredentials: true
                })
                setArtwork(data?.Items);
            }
            catch(err){
                console.log("error is", err);
            }
        }
        pullData()
    
    },[debouncedNameSearch])

    const handleSerach = (e) => {
        const value = e.target.value
        setNameSearch(value);
    }

    return <div className="flex flex-col">
                <input onChange={handleSerach} name='search' className ='w-36 m-auto' placeholder="Search by name" />
                <div className="grid gap-4 grid-cols-3 w-4/5 m-auto">
        {artworks?.map((artwork,index) => {
            const {image, name,description, price } = artwork;
            return <div key={index} className=" m-10 rounded overflow-hidden shadow-lg">
            <img className="" src={image} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{name}</div>
              <p className="text-gray-700 text-base">
                {description}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{price}$</span>
            </div>
          </div>
        })}
    </div>
    </div>
 
}   