import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Link href="/Metro" >
        <button className="w-full py-2 px-4 bg-blue-100 hover:bg-blue-200 rounded">🚇 Metro</button>
      </Link>


            <Link href="/Paraderos" >
              <button className="w-full py-2 px-4 bg-blue-100 hover:bg-blue-200 rounded">🚍 Paraderos</button>
            </Link>

              <Link href="/Tarjeta" >
                <button className="w-full py-2 px-4 bg-blue-100 hover   :bg-blue-200 rounded">💳 Tarjeta</button >
              </Link>

                <Link href="/FarmaParaderoscias" >
                  <button className="w-full py-2 px-4 bg-orange-100 hover:bg-orange-200 rounded">🚍 Paraderos</button>
                </Link>
                <Link href="/Farmacia">
                <button className="w-full py-2 px-4 bg-pink-100 hover:bg-pink-200 rounded">💊 Farmacias</button>
                </Link>


      
      <button className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded">🌍 Sismos</button>
    </div>
  );
}