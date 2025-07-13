import Image from 'next/image';
import React from 'react'

export default function Gallery({gallery}) {

  const newGallery = [...gallery];
  newGallery.shift();

  return (
     <section className="container">
      <div className="grid grid-cols-2 imageshowCase">
        <Image
        src={gallery[0]}
        alt="Hotel Main Image"
        width={400}
        height={400}
        />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
          {newGallery.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Hotel Image ${index + 1}`}
              width={400}
              height={400}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
