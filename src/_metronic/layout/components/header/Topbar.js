import React, { useMemo } from "react";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../_helpers";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { UserNotificationsDropdown } from "../extras/dropdowns/UserNotificationsDropdown";
import { QuickUserToggler } from "../extras/QuiclUserToggler";

export function Topbar() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      viewNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      viewQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      viewUserDisplay: objectPath.get(uiService.config, "extras.user.display"),
    };
  }, [uiService]);

  return (
    <div className="topbar text-right">
      {layoutProps.viewNotificationsDisplay && <UserNotificationsDropdown />}

      {layoutProps.viewQuickPanelDisplay && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="quick-panel-tooltip">Quick panel</Tooltip>}
        >
          <div
            className="topbar-item"
            data-toggle="tooltip"
            title="Quick panel"
            data-placement="right"
          >
            <div
              className="btn btn-icon btn-clean btn-lg mr-1"
              id="kt_quick_panel_toggle"
            >
              <span className="svg-icon svg-icon-xl svg-icon-primary">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Layout/Layout-4-blocks.svg"
                  )}
                />
              </span>
            </div>
          </div>
        </OverlayTrigger>
      )}

      {layoutProps.viewUserDisplay && <QuickUserToggler />}
    </div>
  );
}
