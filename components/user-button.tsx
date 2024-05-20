// User Button Avatar
'use client'
import { Button } from '@/components/ui/button'
import { Avatar } from '@mui/material'
import Link from 'next/link'
import { useCurrentUser } from '@/hooks/user-current-user'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AtSign, Github, Instagram, LogOut, Mail, User, Youtube } from 'lucide-react'
import { logout } from '@/actions/logout'
const UserButton = () => {
  const session = useCurrentUser()
  const router = useRouter()
  const onClick = () => {
    router.push('/auth/register')
  }
  const Logout = () => {
    logout();
    router.push('/auth/login')
}
const style = {
  width: {
    xs: 35, // width on extra-small devices
    md: 40, // default width
  },
  height: {
    xs: 35, // height on extra-small devices
    md: 40, // default height
  },
};

  return (
    <>
      {!session ? (
        <div>
          <Link href='/auth/register' className='flex md:hidden items-center justify-center  rounded-lg cursor-pointer transition duration-300 hover:bg-white/5 px-2 py-2'>
            <LogOut className='text-slate-100 h-5.5 w-5'/>
          </Link>
          
          <Button
          type="submit"
          onClick={onClick}
          className="p-[2px] font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 h-full hidden md:flex"
        >
          <div className="flex items-center px-5 lg:px-7 h-full bg-zinc-800 rounded-md transition duration-300 text-white hover:bg-transparent text-base lg:text-lg">
            Sign Up
          </div>
        </Button>
        </div>
      ) : (
        
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='cursor-pointer'>
              <Avatar
                src={session.image ? session.image : ''}
                alt="logo"
                className="shadow-md shadow-[#191919] cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 xs:mt-0.5 ml-0.5 md:my-0"
                sx={style}
              ></Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-[#0E0E0E] border-slate-100/20 w-56'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-slate-100/20'/>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User className='mr-2 h-4 w-4' />
                    <span>{session.name}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4"/>
                    <span>{session.email}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className='bg-slate-100/20'/>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                    <Link className="flex" href='https://github.com/NizarAbiZaher'>
                        <Github className="mr-2 mt-0.5 h-4 w-4"/>
                        <span>GitHub</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className="flex" href='https://www.youtube.com/@NizzyABI'>
                        <Youtube className="mr-2 mt-0.5 h-4 w-4"/>
                        <span>Youtube</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className="flex" href='https://www.instagram.com/nizzyabi/'>
                        <Instagram className="mr-2 mt-0.5 h-4 w-4"/>
                        <span>Instagram</span>
                    </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className='bg-slate-100/20'/>
              <DropdownMenuItem className='cursor-pointer'>
                <LogOut className='mr-2 h-4 w-4' />
                <button type='submit' onClick={Logout}>Log out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
       
      )}
    </>
  )
}

export default UserButton
