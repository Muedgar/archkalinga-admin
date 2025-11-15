'use client'

import NewStatusGroup from "./forms/add-status-group"

export default function TaskManagerComponents() {

    return (
        <div>
            {/* group */}
            <div className="w-screen h-screen border overflow-y-hidden overflow-x-auto p-10">
                <NewStatusGroup />
            </div>
        </div>
    )
}