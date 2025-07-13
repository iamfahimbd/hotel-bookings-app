import React from 'react'
import HotelSummaryInfo from '../HotelSummaryInfo'

export default function Summary({hotelInfo}) {
  return (
    <section className="py-4 mt-[100px] ">
      <div className="flex container">
        <HotelSummaryInfo info={hotelInfo} />
      </div>
    </section>
  )
}
