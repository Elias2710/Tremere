import { Strategy } from 'passport-jwt';
import { AuthorizedUser } from './models/authorized.user';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    validate(payload: any): AuthorizedUser;
    constructor();
}
export {};
