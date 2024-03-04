import { MoreVert } from "@mui/icons-material"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { Eye, SquarePen, Trash } from "lucide"
import { useState } from "react"

export const RowOptions = ({
    handleShow,
}) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
        setAnchorEl(null)
    }
    const handleShowHere = () => {
        handleShow()
        setAnchorEl(null)
    }
    const handleOpenAddUser = () => {
        setOpen(!open)
        setAnchorEl(null)
    }

    return (
        <>
            <IconButton size='small' onClick={handleRowOptionsClick}>
                <MoreVert />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={rowOptionsOpen}
                onClose={handleRowOptionsClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                PaperProps={{ style: { minWidth: '8rem' } }}
            >
                <MenuItem sx={{ '& svg': { mr: 2 } }} href='' onClick={handleShowHere}>
                    <Eye size={20} />
                    Voir
                </MenuItem>
                <MenuItem onClick={handleOpenAddUser} sx={{ '& svg': { mr: 2 } }}>
                    <SquarePen size={20} />
                    Modifier
                </MenuItem>
                <MenuItem sx={{ '& svg': { mr: 2 } }}>
                    <Trash size={20} />
                    Archiver
                </MenuItem>
            </Menu>
        </>
    )
}