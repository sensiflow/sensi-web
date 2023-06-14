import { Page } from "../../model/page";
import { PaginationModel } from "../../model/pagination-model";


/**
 * Common props for all data grid lists.
 */
export interface DataGridListProps<T> {
    isLoading: boolean;
    currentPage : Page<T>;
    paginationModel: PaginationModel;
    onPaginationModelChange: (GridPaginationModel) => void;
    rowSelectionModel?: Array<number>;
    onRowSelection?: (newSelection: Array<number>) => void;
}
/*
interface DataGridListInnerProps<T> extends DataGridListProps<T> {
    dataProps: DataGridListProps<T>,
     <R extends GridValidRowModel = any>(props: DataGridProps<R> & React.RefAttributes<HTMLDivElement>): JSX.Element;
}

function DataGridList<T>({
        dataProps
}: DataGridListInnerProps<T>){
    const a = dataProps.isLoading;
    return (
        <DataGrid 
            paginationMode="server"
            keepNonExistentRowsSelected
            autoHeight
            density="comfortable"
            checkboxSelection
            disableRowSelectionOnClick
            loading={dataPro}
            slots={{
                loadingOverlay: LinearProgress,
            }}
            editMode="cell" columns={[]} rows={[]}        />
    )
}

*///TODO: remove