package com.example.demo;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import javax.sql.DataSource;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

	@Autowired
	private DataSource dataSource;

	@Test
	void contextLoads() throws Exception {
		try (Connection connection = dataSource.getConnection()) {
			DatabaseMetaData metaData = connection.getMetaData();
			System.out.println("=== TABLES ===");
			try (ResultSet tables = metaData.getTables("store", null, "%", new String[] { "TABLE" })) {
				while (tables.next()) {
					String tableName = tables.getString("TABLE_NAME");
					System.out.println("Table: " + tableName);
					try (ResultSet columns = metaData.getColumns("store", null, tableName, "%")) {
						while (columns.next()) {
							String columnName = columns.getString("COLUMN_NAME");
							String typeName = columns.getString("TYPE_NAME");
							int columnSize = columns.getInt("COLUMN_SIZE");
							System.out.println("  Column: " + columnName + " (" + typeName + "(" + columnSize + "))");
						}
					}
				}
			}
			System.out.println("==============");
		}
	}

}
