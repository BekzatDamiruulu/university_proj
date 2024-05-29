import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import {
    IGroupState,
    IGroup,
    IGroupAddDto,
    IGroupStoreInformation,
} from './group.contracts.ts'
import { ITeacher } from '../teacher/forAnotherSlice/group.ts'
import { TActionTypes, TGroupPick } from './group.types.ts'
import { useDispatch } from 'react-redux'
import { IStoreInformation } from '../../shared/index.ts'

const initialState: IGroupState = {
    groups: [],
    groupsWithCertainProps: [],
    infoOfDataGroup: {
        total: 0,
        count: 0,
        limit: 0,
        offset: 0,
    },
    infoOfDataGroupCertainProps: {
        total: 0,
        count: 0,
        limit: 0,
        offset: 0,
    },
    statusGroupsData: 'idle',
}

export const groupSlice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
        fetchingGroups: (state) => {
            state.statusGroupsData = 'loading'
        },
        fetchedGroups: (state, action: PayloadAction<IGroup[]>) => {
            state.groups = action.payload
            state.statusGroupsData = 'loaded'
        },
        fetchGroupError: (state) => {
            state.statusGroupsData = 'error'
        },
        addGroup: (state, action: PayloadAction<IGroup>) => {
            state.groups.push(action.payload)
        },
        deleteGroup: (state, action: PayloadAction<number>) => {
            state.infoOfDataGroup.count = state.infoOfDataGroup.count - 1
            state.infoOfDataGroup.total = state.infoOfDataGroup.total - 1
            state.groups = state.groups.filter((g) => g.id !== action.payload)
        },
        deleteGroupWithCertainProps: (state, action: PayloadAction<number>) => {
            state.groupsWithCertainProps = state.groupsWithCertainProps.filter(
                (g) => g.Id !== action.payload
            )
            state.infoOfDataGroupCertainProps.total =
                state.infoOfDataGroupCertainProps.total - 1
            state.infoOfDataGroupCertainProps.count =
                state.infoOfDataGroupCertainProps.count - 1
        },
        setGroupsWithCertainProps: (
            state,
            action: PayloadAction<TGroupPick[]>
        ) => {
            state.groupsWithCertainProps = action.payload
        },
        loadMoreGroupsWithCerProps: (s, a: PayloadAction<TGroupPick[]>) => {
            s.groupsWithCertainProps = [
                ...s.groupsWithCertainProps,
                ...a.payload,
            ]
            s.infoOfDataGroupCertainProps.count =
                s.infoOfDataGroupCertainProps.count + a.payload.length
        },
        setGroupsWithCertainPropsInfo: (
            s,
            a: PayloadAction<IStoreInformation>
        ) => {
            s.infoOfDataGroupCertainProps = a.payload
        },
        updateGroup: (state, action: PayloadAction<IGroup>) => {
            let index = 0
            state.groups.filter((g, i) => {
                if (g.id === action.payload.id) {
                    index = i
                }
                return g
            })
            state.groups.splice(index, 1, action.payload)
        },
        setInfoDataGroup: (s, a: PayloadAction<IGroupStoreInformation>) => {
            s.infoOfDataGroup = a.payload
        },
        addGroupWithCertainProps: (s, a: PayloadAction<TGroupPick>) => {
            s.groupsWithCertainProps.push(a.payload)
        },
        updateGroupTeacher: (state, action: PayloadAction<ITeacher>) => {
            state.groups = state.groups.map((g) => {
                if (g.id === action.payload.groupId) {
                    action.payload.group = null
                    g.teacher = action.payload
                }
                return g
            })
        },
    },
})

export const groupReducer = groupSlice.reducer
export const groupActions = groupSlice.actions
