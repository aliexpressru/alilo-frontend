import { DataSource, DataSourceResponse, ExprResponse } from "../../types/MetrixTypes";
import { http } from "../../axios";

class MetrixService {
    async getMetrixExpr(expr: string, dataSource: string): Promise<ExprResponse> {
        const daysAgo = 7;
        const currentTime = new Date();
        const currentTimestamp = currentTime.getTime();

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - daysAgo);
        const oneWeekAgoTimestamp = oneWeekAgo.getTime();

        const payload = {
            expr: expr.replace(/\\"/g, '"'),
            data_source: dataSource,
            from_ts: currentTimestamp.toString(),
            to_ts: oneWeekAgoTimestamp.toString(),
            step_sec: '1',
        };

        const { data } = await http.post<ExprResponse>(
            '/v1/metrics/expr',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        return data;
    }

    async getMetrixExprByTime(expr: string, dataSource: string, fromData: string, toData: string): Promise<ExprResponse> {
        const payload = {
            expr: expr.replace(/\\"/g, '"'),
            data_source: dataSource,
            from_ts: fromData,
            to_ts: toData,
            step_sec: '1',
        };

        const { data } = await http.post<ExprResponse>(
            '/v1/metrics/expr',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        return data;
    }

    async getDataSource(): Promise<DataSource[]> {
        const response = await http.post<DataSourceResponse>('/v1/metrics/get-data-source', {});
        return response.data.data_sources;
    }
}

export const metrixService = new MetrixService();
