import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { GLobalStyles } from "./constants/styles";

//react navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Screens
import ManageExpense from "./screens/ManageExpenses";
import RecentExpenses from "./screens/RecentExpense";
import AllExpenses from "./screens/AllExpenses";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
	return (
		<BottomTabs.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: GLobalStyles.colors.primary500,
				},
				headerTintColor: "white",
				tabBarStyle: {
					backgroundColor: GLobalStyles.colors.primary500,
				},
				tabBarActiveTintColor: GLobalStyles.colors.accent500,
			}}
		>
			<BottomTabs.Screen
				name={"RecentExpenses"}
				component={RecentExpenses}
				options={{
					title: "Recent Expenses",
					tabBarLabel: "Recent",
					tabBarIcon: ({ color, size }) => {
						return (
							<Ionicons
								name="hourglass"
								color={color}
								size={size}
							/>
						);
					},
				}}
			/>
			<BottomTabs.Screen
				name={"AllExpenses"}
				component={AllExpenses}
				options={{
					title: "All Expenses",
					tabBarLabel: "All",
					tabBarIcon: ({ color, size }) => {
						return (
							<Ionicons
								name="calendar"
								color={color}
								size={size}
							/>
						);
					},
				}}
			/>
		</BottomTabs.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name={"ExpenseOverview"}
						component={ExpensesOverview}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={"ManageExpense"}
						component={ManageExpense}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
