'use client'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  //   SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  //   SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useIsMobile, useSidebarStore, useStore } from '@/hooks'
import { cn, getMenuList } from '@/lib'
import { DropdownMenuItem, Label } from '@radix-ui/react-dropdown-menu'
import {
  ArrowLeftCircleIcon,
  ChevronDown,
  ChevronsUpDownIcon,
  PowerIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { IUser } from '@/interfaces'
import { getUser } from '@/store/thunks'
import { logout } from '@/store/slices/auth.slice'
import Link from 'next/link'

export default function SideBar() {
  const router = useRouter();
  const isMobile = useIsMobile()
  const menuList = getMenuList();
  const [isCollapse, setIsCollapse] = useState(true)
  const { user } = useSelector((state: RootState) => state.auth)
  const [userDetails, setUserDetails] = useState<IUser>()
const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
      if (user?.id) {
        dispatch(getUser({ id: `${user?.id}` }))
        .unwrap()
        .then(d => {
          setUserDetails(d)
        })
      }
    }, [dispatch, user])

    const handleLogout = () => {
      dispatch(logout())
      router.push('/auth/login')
    }
  // use store
  const sidebar = useStore(useSidebarStore, (x) => x)
  if (!sidebar) return null
  const { getOpenState, toggleOpen } = sidebar
  return (
    <Sidebar
      className={cn(
        'fixed left-0 top-0 h-screen transition-all ease-in duration-300',
        getOpenState() ? 'w-[90px]' : 'w-72'
      )}
    >
      {' '}
      {/* header */}
      <SidebarHeader>
        {/* menu */}
        <SidebarMenu>
          {/* menu item */}
          <SidebarMenuItem className="ml-2 mr-2 mt-4 mb-4 flex justify-between items-center relative">
            <Label className="text-lg font-bold cursor-pointer ">
              {!getOpenState() ? (
                'ArchKalinga'
              ) : (
                <span className="flex flex-col">
                  <span>Arch</span>
                  <span>Kalinga</span>
                </span>
              )}
            </Label>
            {!isMobile && (
              <ArrowLeftCircleIcon
                onClick={() => toggleOpen()}
                className={cn(
                  'cursor-pointer size-5 transition-all ease-in duration-300 z-10 text-black',
                  getOpenState()
                    ? 'rotate-180 ml-20 fixed top-7 left-[0px] opacity-100'
                    : 'rotate-0 opacity-100'
                )}
              />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* content */}
 {/* content */}
        <SidebarContent>
        {/* render menu according to menu list. */}
        <ScrollArea className="h-[700px] w-full">
        
        {/* content groups */}
        {menuList.map(({ groupLabel, menus }, index) => (
            <SidebarGroup key={index}>
            {/* Group label */}
            <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
            {menus.map(({href, label, icon: Icon, submenus}, index) => (
                <SidebarGroupContent className='mt-1' key={index}>
              {(!submenus || submenus?.length === 0) ?
              <SidebarMenu>
                <SidebarMenuItem>
                  {/* Collapsible */}
                  {!getOpenState()?
                   <Link prefetch={true} href={href}>
                   <Button className='w-full flex justify-between cursor-pointer'>
            <div className='flex justify-center items-center'>
              {Icon && <Icon size={18} />}
            <p className='ml-4'>{label}</p>
            </div>
          </Button>
                   </Link>:
              <DropdownMenu>
                <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger className="cursor-pointer w-full flex justify-center items-center" asChild>
                 <Link prefetch={true} href={href}>
                  <Button className='w-fit flex justify-between cursor-pointer'>
            <div className='flex justify-center items-center'>
              {Icon && <Icon size={18} />}
            </div>
             
          </Button>
                  </Link>
                </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      </DropdownMenu>}
                 

                 
                </SidebarMenuItem>
              </SidebarMenu>:
              <SidebarMenu>
                <SidebarMenuItem>
                  {/* Collapsible */}
                  {!getOpenState()?
                   <Collapsible>
                    <CollapsibleTrigger
                    className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
        asChild>
          <Button onClick={() => setIsCollapse(!isCollapse)} className='w-full flex justify-between cursor-pointer'>
            <div className='flex justify-center items-center'>
              {Icon && <Icon size={18} />}
            <p className='ml-4'>{label}</p>
            </div>
             <div
              className={cn(
                'whitespace-nowrap',
                !isCollapse
                  ? 'rotate-180'
                  : 'rotate-0'
              )}
            >
              <ChevronDown
                size={18}
                className="transition-transform duration-200"
              />
            </div>
          </Button>


        </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                      <div className='w-full h-fit flex'>
                        <div className='w-full h-fit border-l pl-2 flex flex-col'>
                          {submenus?.map(({href, label}, index) => (
                            <Link className='w-full' prefetch={true} href={href} key={index}>
                            <Button  className='w-full mb-1 flex justify-start items-start cursor-pointer'>
                        <p className='text-left'>{label}</p>
                      </Button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>:
              <DropdownMenu>
                
                   {/* if side bar is closed */}
                  {/* dropdown */}
                <div>
                  {/* dropdown trigger */}
                <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger className="cursor-pointer w-full flex justify-center items-center" asChild>
                  <Link prefetch={true} href={'#'}>
                  <Button onClick={() => setIsCollapse(!isCollapse)} className='w-fit flex justify-between cursor-pointer'>
            <div className='flex justify-center items-center'>
              {Icon && <Icon size={18} />}
            </div>
             
          </Button>
                  </Link>
                </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
                {/* dropdown content */}
                <DropdownMenuContent
                  side={!getOpenState() ? 'bottom' : 'right'}
                  className="w-[240px] cursor-pointer pt-2 pb-2"
                  align="start"
                >
                  <div className='w-full h-fit flex'>
                        <div className='w-full h-fit border-l pl-2 flex flex-col'>
                          {submenus?.map(({href, label}, index) => (
                            <Link prefetch={true} href={href} key={index}>
                            <Button className='w-full mb-1 flex justify-start items-start cursor-pointer'>
                        <p className='text-left'>{label}</p>
                      </Button>
                            </Link>
                          ))}
                        </div>
                      </div>
                </DropdownMenuContent>
                </div>
              </DropdownMenu>}
                 

                 
                </SidebarMenuItem>
              </SidebarMenu>}
            </SidebarGroupContent>
            ))}
          </SidebarGroup>
        ))}

        </ScrollArea>
        
        </SidebarContent>
      {/* footer */}
       <SidebarFooter>
          {/* menu */}
          <SidebarMenu>
            {/* menu item */}
            <SidebarMenuItem>
              {/* dropdown */}
              <DropdownMenu>
                {/* dropdown trigger */}
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="flex justify-start focus:outline-none items-start data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <PowerIcon className="size-4" />
                    </div>
                    {!getOpenState() && (
                      <div className="flex">
                        <div className="flex flex-col justify-center items-start gap-0.5 leading-none">
                          <span className="font-bold">{userDetails?.email}</span>
                          <span className="">{userDetails?.userName}</span>
                        </div>
                        <ChevronsUpDownIcon size={18} className="ml-auto" />
                      </div>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                {/* dropdown content */}
                <DropdownMenuContent
                  side={!getOpenState() ? 'bottom' : 'right'}
                  className="w-[200px] cursor-pointer pt-2 pb-2"
                  align="start"
                >
                  <DropdownMenuItem
                      className="w-full flex h-[54px] items-center pl-2 pr-2 hover:bg-slate-300"
                    >
                      <Link className='w-full' prefetch={true} href={'/admin/users/profile'}>
                      <Button className="w-full">
                        <span className="font-bold text-sm">Profile</span>
                      </Button>
                      </Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem
                      className="w-full flex h-[54px] items-center pl-2 pr-2 hover:bg-slate-300"
                    >
                      <Link className='w-full' prefetch={true} href={'#'}>
                      <Button onClick={() => handleLogout()} className="w-full">
                        <span className="font-bold text-sm">Logout</span>
                      </Button>
                      </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
