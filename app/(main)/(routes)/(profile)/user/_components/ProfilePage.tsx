import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react'

interface ProfilePageProps {
    user: User;
}

export default function ProfilePage({ user }:  ProfilePageProps) {
  return (
    <main className='flex sm:justify-between justify-start items-start my-20'>
      <div className='flex flex-col items-start justify-start'>
        <h3 className='sm:text-xl text-base font-semibold'>{user?.name}</h3>
        <p className='mt-3 sm:text-base text-sm'>{user?.userName}</p>
        <p className='mt-10 sm:text-base text-sm'>{user?.bio}</p>
      </div>
      <div>
        <Image className='rounded-full min-w-[80px] min-h-[80px]' src={user?.image!} width={80} height={80} alt={user?.name|| "profile image"} />
      </div>
    </main>
  )
}
