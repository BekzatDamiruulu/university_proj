import { IGroup, IUpdateGroupDto } from './group.contracts.ts'
import { groupSlice } from './group.model.ts'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

export type TGroupPick = { Id: number; Name: string }
export type TUpdateGroup = Partial<IUpdateGroupDto>

export type TActionTypes = ReturnType<
    (typeof groupSlice.actions)[keyof typeof groupSlice.actions]
>
