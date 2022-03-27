import React, {useMemo, useLayoutEffect, useEffect} from "react";
import objectPath from "object-path";
import {useLocation} from "react-router-dom";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { Topbar } from "./Topbar";
// import {HeaderMenuWrapper} from "./header-menu/HeaderMenuWrapper";
import { AnimateLoading } from "../../../_partials/controls";
import { BreadCrumbs } from "../subheader/components/BreadCrumbs";
import {getBreadcrumbsAndTitle, useSubheader} from "../../_core/MetronicSubheader";

export function Header() {
  const uiService = useHtmlClassService();
  const subheader = useSubheader();
  const location = useLocation()

  const layoutProps = useMemo(() => {
    return {
      headerClasses: uiService.getClasses("header", true),
      headerAttributes: uiService.getAttributes("header"),
      headerContainerClasses: uiService.getClasses("header_container", true),
      menuHeaderDisplay: objectPath.get(
        uiService.config,
        "header.menu.self.display"
      ),
      config: uiService.config,
      subheaderMobileToggle: objectPath.get(
          uiService.config,
          "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
          "subheader_container",
          true
      )
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs = (aside && aside.breadcrumbs.length > 0) ? aside.breadcrumbs : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle((aside && aside.title && aside.title.length > 0) ? aside.title : header.title);
    // eslint-disable-next-line
  }, [location.pathname]);

  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => {}, [subheader]);

  return (
    <>
      {/*begin::Header*/}
      <div
        className={`header ${layoutProps.headerClasses}`}
        id="kt_header"
        {...layoutProps.headerAttributes}
      >
        {/*begin::Container*/}
        <div className={`${layoutProps.headerContainerClasses} d-flex align-items-stretch justify-content-between`}>
          <AnimateLoading />

          <div
            className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
          >
            {/* Info */}
            <div className="d-flex align-items-center flex-wrap mr-1">
              {layoutProps.subheaderMobileToggle && (
                <button
                  className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
                  id="kt_subheader_mobile_toggle"
                >
                  <span />
                </button>
              )}

              <div className="d-flex align-items-baseline mr-5">
                <h5 className="text-dark font-weight-bold my-2 mr-5">
                  <>
                    {subheader.title}
                  </>
                  {/*<small></small>*/}
                </h5>

              </div>

              <BreadCrumbs items={subheader.breadcrumbs} />
            </div>
          </div>

          {/*begin::Topbar*/}
          <Topbar />
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      </div>
      {/*end::Header*/}
    </>
  );
}
