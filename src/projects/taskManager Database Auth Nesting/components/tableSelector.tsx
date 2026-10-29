import { RadioButton } from "../../../components/radioButton"
import { Fragment } from "react"



export function TableSelector(
    {
        tables,
        currentTable,
        setCurrentTable
     }:
    {
        tables: string[]
        currentTable: string
        setCurrentTable: (currentTable: string) => void
    }
) {

    const tableList = (tables.map((table) => {

        return (
            <Fragment key={table}>
                <RadioButton label={table} radioGroup='tables' currentVal={currentTable} onChange={setCurrentTable}/>
            </Fragment>
        )
    }))

    return (


        <>
        
            <div className='content'>

                {/* Render radio buttons based on the present number of tables */}

                    {tableList}

            </div>
        
        </>
    )
}