import React from "react"
import { View, Image, Text, Linking } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler"

// Imports a mail composer from expo
import * as MailComposer from "expo-mail-composer"

// Imports icons from Feather Icons pack
import { Feather } from "@expo/vector-icons"

// Imports style features
import styles from "./styles"
import logoImg from "../../assets/logo.png"

// Detail component
function Detail() {
	// Gets navigation instance, used to navigate between screens
	const navigation = useNavigation()

	// Gets routes instance
	const route = useRoute()

	// Gets the incident from the params passed on the last page
	const incident = route.params.incident

	// Default message
	const message =
	`Hello ${incident.name}! I'm contacting you in order to support the "${incident.title}" case with ${
		Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(incident.value)
	}.`

	// Function used when you touch arrow-left icon, it redirects you to the last screen
	function navigateBack() {
		navigation.goBack()
	}

	// Function used when you touch e-mail button, it composes a default email
	function sendMail() {
		MailComposer.composeAsync({
			subject: `Hero of the case: ${incident.title}`,
			recipients: [incident.email],
			body: message
		})
	}

	// Function used when you touch whatsapp button, it composes a default whatsapp message
	function sendWhatsapp() {
		Linking.openURL(`whatsapp://send?phone=+${incident.whatsapp}&text=${message}`)
	}

	// Html returned when the component is rendered
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />

				<TouchableOpacity onPress={navigateBack}>
					<Feather name="arrow-left" size={28} color="#e82041" />
				</TouchableOpacity>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>

				<View style={styles.incident}>
					<View style={styles.incidentGroups}>
						<View style={styles.incidentGroup}>
							<Text style={[styles.incidentProperty, { marginTop: 0 }]}>CASE</Text>
							<Text style={[styles.incidentValue, { textAlign: "left" }]}>
								{incident.title}
							</Text>
						</View>
						<View style={styles.incidentGroup}>
							<Text style={[styles.incidentProperty, { marginTop: 0 }]}>
								NGO
							</Text>
							<Text style={styles.incidentValue}>
								{incident.name} from {incident.city}/{incident.state}
							</Text>
						</View>
					</View>
					<Text style={styles.incidentProperty}>DESCRIPTION</Text>
					<Text style={styles.incidentValue}>{incident.description}</Text>
					<Text style={styles.incidentProperty}>VALUE</Text>
					<Text style={styles.incidentValue}>
						{/*
						 * Intl is function which formats
						 * numbers, in this case into USD currency.
						*/}
						{Intl.NumberFormat(
							"en-US",
							{
								style: "currency",
								currency: "USD"
							}
						).format(incident.value)}
					</Text>
				</View>

				<View style={styles.contactBox}>
					<Text style={styles.heroTitle}>Save the day!</Text>
					<Text style={styles.heroTitle}>Be the hero of this case.</Text>
					<Text styles={styles.heroDescription}>Get in touch through:</Text>
					<View style={styles.actions}>
						<TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
							<Text style={styles.actionText}>WhatsApp</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.action} onPress={sendMail}>
							<Text style={styles.actionText}>E-mail</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

// Exports component
export default Detail
