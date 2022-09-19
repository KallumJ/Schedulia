import type { NextApiRequest, NextApiResponse } from 'next'
import MediaSources from '../../../data/sources/media_sources';
import DateUtils from '../../../util/date_utils';
import cacheData from "memory-cache"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req;

    let monthQuery = query["month"];
    let idQuery = query["id"];

    if (monthQuery) {
        const monthStr = monthQuery.toString();
        if (DateUtils.isValidDateString(monthStr)) {
            let date = new Date(monthStr);
            date.setDate(1);

            const events = cacheData.get(date) || await MediaSources.getMediaEvents(date);

            cacheData.put(date, events);
            res.status(200).json(events);
        } else {
            res.status(400).json({ message: "An invalid month was provided" })
        }
    } else if (idQuery) {
        const idStr = idQuery.toString();
        const event = cacheData.get(idStr) || {};

        if (event) {
            cacheData.put(idStr, event)
            res.status(200).json(event);
        } else {
            res.status(400).json({ message: "An invalid id was provided" })
        }
    } else {
        res.status(400).json({ message: "Please provide a valid month or id query parameter, e.g month=2022-09, id=12345" })
    }
}