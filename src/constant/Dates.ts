import {formatDistance, formatRelative, subDays} from "date-fns";

const getRelativeSimpleDate = (date: string): string => {
    return formatDistance(
        subDays(
            new Date(
                +date.split("-")[0],
                +date.split("-")[1],
                +date.split("-")[2]
            ), 3),
        new Date(),
    )
}

const getRelativeISODate = (date: string): string => {

    const splittedDate = date.split('T')[0];

    return formatDistance(
        subDays(
            new Date(
                +splittedDate.split("-")[0],
                +splittedDate.split("-")[1],
                +splittedDate.split("-")[2]
            ), 3),
        new Date(),
    )
}

export {getRelativeSimpleDate, getRelativeISODate}
