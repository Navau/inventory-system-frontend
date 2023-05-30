import React from "react";
import { Button, Form, Input, Space, Typography } from "antd";
import { useMediaQuery } from "react-responsive";
import { map, size } from "lodash";

import "./MyHeaderPage.scss";

export function MyHeaderPage(props) {
  const { title, btnOptions, inputOptions } = props;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <div className="my-header-page-admin">
      <Typography.Title level={2}>{title}</Typography.Title>
      <Space align="center" className="my-header-page-admin__actions">
        {size(inputOptions) > 0 && (
          <Space align="center" className="my-header-page-admin__inputs">
            {map(inputOptions, (input, index) => (
              <Form.Item
                key={index}
                label={!isTabletOrMobile ? input.title : null}
                tooltip="Presioné enter para ejecutar la busqueda o presione en el icono de busqueda"
              >
                <Input.Search
                  placeholder={input.title}
                  allowClear
                  enterButton="Buscar"
                  onSearch={(value) => input.onSearch(value)}
                />
              </Form.Item>
            ))}
          </Space>
        )}
        {size(btnOptions) > 0 && (
          <Space className="my-header-page-admin__buttons">
            {map(btnOptions, (btn, index) => (
              <Button
                key={index}
                icon={btn.icon}
                type={btn.type}
                onClick={btn.onClick}
              >
                {btn.title}
              </Button>
            ))}
          </Space>
        )}
      </Space>
    </div>
  );
}
