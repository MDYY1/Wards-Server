import { Body, Controller, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { SessionService } from "./session.service";
import { Session } from "./session.dto";

@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }

    @Post()
    async getSession(@Body() session: Session, @Res() res) {
        const result = await this.sessionService.getSession(session);
        switch (result) {
            case "update": return res.status(404).json({
                "error": {
                    "code": "user_error",
                    "description": "请更新版本"
                },
                "message": "请更新版本",
                "status_code": 404
            });
            case "banned": return res.status(403).json({
                "error": {
                    "code": "user_error",
                    "description": "banned"
                },
                "message": "Forbidden",
                "status_code": 403
            });
            default:
                return res.status(200).json(result);
        }
    }
}
