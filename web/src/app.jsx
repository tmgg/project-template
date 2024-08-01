// 调整umi 默认配置
import React from "react";
import {appendDefaultRoutes, cacheRoutes} from "@tmgg/tmgg-system";

export function patchRoutes({ routes }) {
  appendDefaultRoutes(routes)
  cacheRoutes(routes)
}



