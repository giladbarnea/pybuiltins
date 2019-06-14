/**@example
 for(...) {
   perf.mark('start');
   // do something
   perf.mark('end');
   perf.measure('start', 'end');
 }
 const measures = perf.getMeasures('start', 'end');
 console.log(measures.name, measures.avg());
 > start -> end 48.01234567891011127*/
import {performance, PerformanceEntry} from "perf_hooks";

export function mark(markName: string) {
    performance.mark(markName);
}

export function measure(startMark: string, endMark: string) {
    performance.measure(`${startMark} -> ${endMark}`, startMark, endMark);
}

export function measureMany(...startEndPairs: string[][]) {
    for (let [start, end] of startEndPairs)
        measure(start, end);
}

export function getMeasures(startMark: string, endMark: string): PerformanceEntry[] {
    const name = `${startMark} -> ${endMark}`;
    const measures = performance.getEntriesByName(name, 'measure');
    Object.defineProperties(measures, {
        avg: {
            value(): number {
                const durations = measures.map(m => m.duration);
                return durations.reduce((a, b) => a + b) / durations.length;
            }
        },
        name: {
            value(): string {
                return name
            }
        }
    });
    return measures;
}

export function getManyMeasures(...startEndPairs: string[][]): PerformanceEntry[] {
    const manyMeasures = [];
    for (let [start, end] of startEndPairs)
        manyMeasures.push(getMeasures(start, end));
    return manyMeasures;
}



