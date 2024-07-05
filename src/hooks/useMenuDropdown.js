import  { useEffect , useState } from "react";

export default function HandleMenu () {

  const [showMenu,setShowMenu] = useState(false)

  // HANDLE CLOSE MENU
  function closeMenu () {
    setShowMenu(false)
  }

  // HANDLE OPEN MENU
  function handleShowMenu (e) {
    e.preventDefault()
    if (!showMenu) {
      e.stopPropagation()
    }
    setShowMenu(true)
  }

  useEffect(()=>{
    document.body.addEventListener('click', closeMenu );

    return function cleanup() {
      window.removeEventListener('click', closeMenu );
    } 
  },[])

  return { 
    handleShowMenu, 
    closeMenu, 
    showMenu
  }

}

