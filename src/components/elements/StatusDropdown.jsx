import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'
import { Spinner } from '../svg'

export default function StatusDropDown({ value = "new", list = [], type = "priority", onChange, loading = false }) {
    const getColor = (color) => "zt-" + type + "-" + color
    return (
        <div className="flex justify-center">
            <Menu>
                <MenuButton className={`zt-status ${getColor(value)}`}>
                    {loading ? <Spinner /> : value}
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="zt-status-items"
                >
                    {list.length > 0 && list.filter(item => item.show).map(item => (
                        <MenuItem onClick={() => { onChange(item.value) }} key={item.value}>
                            <div className={`zt-status-item ${getColor(item.value)} text-center capitalize text-white`}>
                                {item.value}
                            </div>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </div>
    )
}