import Image from 'next/image'
import React from 'react'
import HotelSummaryInfo from './HotelSummaryInfo'

export default function HotelCard({ hotelInfo }) {
  return (
    <div className="flex gap-6 border border-gray/20 p-4 rounded-md">
            <Image
              src={hotelInfo?.thumbNailUrl}
              alt="Hotel Image"
              width={240}
              height={165}
              className="max-h-[162px] max-w-[240px]"
            
            />
            <HotelSummaryInfo 
            info={hotelInfo}
            fromListPage={true} />
          </div>
  )
}
