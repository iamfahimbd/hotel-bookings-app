/* eslint-disable react/no-unescaped-entities */
import HotelList from '@/components/hotel/HotelList'
import Filter from '@/components/search/Filter'
import Search from '@/components/search/Search'


export default async function HotelListPage() {
  
  return (
    <>
     <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
      <div className="container items-center py-12 ">
        <Search fromList={true}/>
      </div>
    </section>
    
    <section class="py-12">
      <div class="container grid grid-cols-12">
        
        <Filter />
        <HotelList />
      </div>
    </section>
    </>
  )
}
