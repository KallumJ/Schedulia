import type { NextApiRequest, NextApiResponse } from 'next'
import MediaSources from '../../../data/sources/media_sources';
import DateUtils from '../../../util/date_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { query: { month } } = req;

    let date: Date | undefined = undefined;
    if (typeof month === "string") {
        if (DateUtils.isValidDateString(month)) {
            date = new Date(month);
            date.setDate(1);
        }
    }

    if (date == undefined) {
        res.status(400).json({ message: "Please provide a valid date as a path parameter, e.g /2022-09" })
        return;
    }

    res.status(200).json(await MediaSources.getMediaEvents(date));
}